package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.ForgotPasswordStudentDto;
import com.app.dto.LoginDto;
import com.app.dto.StudentWithBatchIdDto;
import com.app.dto.UpdateStudentDto;
import com.app.entity.Batch;
import com.app.entity.Student;
import com.app.repository.IStudentRepository;

@Service
@Transactional
public class StudentServiceImpl implements IStudentService {
	@Autowired
	private IStudentRepository studentRepo;
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<Student> getAll() {
		return studentRepo.findAll();
	}

	// under_trial
	@Override
	public List<StudentWithBatchIdDto> getStudentIncBatchId() {
		List<Student> findAllStudent = studentRepo.findAll();// data
		List<StudentWithBatchIdDto> stdDto = new ArrayList<StudentWithBatchIdDto>();// empty
		for (Student s : findAllStudent) {
			// StudentWithBatchIdDto sd = new StudentWithBatchIdDto();
			StudentWithBatchIdDto stdBiObj = mapper.map(s, StudentWithBatchIdDto.class);
			stdDto.add(stdBiObj);
		}
		for (int i = 0; i < findAllStudent.size(); i++) {
			long stdBatchId = findAllStudent.get(i).getBatchTbl().getBatchId();
			stdDto.get(i).setStdBatchId(stdBatchId);
		}
		return stdDto;
	}

	@Override
	public Student getByStudentId(Long id) {
		return studentRepo.findById(id).get();
	}

	@Override
	public List<Student> getStudentByBatchId(Batch batch) {
		return studentRepo.findByBatchTbl(batch);
	}

	@Override
	public Student insertStudent(Student traStudent) {
		return studentRepo.save(traStudent);
	}

	@Override
	public String deleteStudent(Long id) {
		if (studentRepo.existsById(id)) {
			studentRepo.deleteById(id);
			return "Student Succesfully Deleted";
		}
		return "Student Deletion Failed : Invalid Id";
	}

	@Override
	public Student editStudent(Long id, UpdateStudentDto detachedStudent) {
		if (studentRepo.existsById(id)) {
			Student upStudent = getByStudentId(id);
			upStudent.setStdEmail(detachedStudent.getStdEmail());
			upStudent.setStdFirstname(detachedStudent.getStdFirstname());
			upStudent.setStdLastname(detachedStudent.getStdLastname());
			return studentRepo.save(upStudent);
		}
		throw new ResourceNotFoundException("Invalid Student Id : Updation Failed");
	}

	@Override
	public Student authenticateStudent(LoginDto logDtoStudent) {
		return studentRepo.findByStdEmailAndStdPassword(logDtoStudent.getEmail(), logDtoStudent.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Student Credentials !"));
	}

	@Override
	public Student getStudentPassword(ForgotPasswordStudentDto studentDetails) {
		return studentRepo
				.findByStdEmailAndStdFirstnameAndStdLastnameAndStdPrnAndStdRollno(studentDetails.getEmail(),
						studentDetails.getFirstname(), studentDetails.getLastname(), studentDetails.getPrn(),
						studentDetails.getRollno())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Student Credentials ! Student Not Exist"));
	}

	@Override
	public Student getByFirstnameAndLastname(String firstName, String lastName) {
		return studentRepo.findByStdFirstnameAndStdLastname(firstName, lastName)
				.orElseThrow(() -> new ResourceNotFoundException("Student Not Found !"));
	}

	@Override
	public Student getByRollno(String rollNo) {
		return studentRepo.findByStdRollno(rollNo)
				.orElseThrow(() -> new ResourceNotFoundException("Student Not Found !"));
	}

}
