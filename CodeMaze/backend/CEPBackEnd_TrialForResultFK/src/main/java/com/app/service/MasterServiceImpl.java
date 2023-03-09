package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.UpdateMasterDto;
import com.app.entity.Admin;
import com.app.entity.Master;
import com.app.entity.Question;
import com.app.entity.Student;
import com.app.entity.Test;
import com.app.repository.IMasterRepository;

@Service
@Transactional
public class MasterServiceImpl implements IMasterService {
//dependency
	@Autowired
	private IMasterRepository masterRepo;

	@Autowired
	private IAdminService adminService;

	@Autowired
	private IStudentService studentService;

	@Autowired
	private ITestService testService;

	@Autowired
	private IQuestionService queService;

//get all list
	@Override
	public List<Master> getAll() {
		return masterRepo.findAll();
	}

//get by id
	@Override
	public Master getByMasterId(Long masterId) {
		return masterRepo.findById(masterId).get();
	}

//insert
	@Override
	public Master insertMaster(Long masterID, Long adminID, Long stdID, Long testID, Long queID) {
		Admin inAdmin = adminService.getByAdminId(adminID);
		Student inStudent = studentService.getByStudentId(stdID);
		Test inTest = testService.getByTestId(testID);
		Question inQuestion = queService.getByQuestionId(queID);
		Master transientMaster = new Master(masterID, inAdmin, inStudent, inTest, inQuestion);
		return masterRepo.save(transientMaster);
	}

//delete
	@Override
	public String deleteMaster(Long id) {
		if (masterRepo.existsById(id)) {
			masterRepo.deleteById(id);
			return "Master Succesfully Deleted";
		}
		return "Master Deletion Failed : Invalid Id";
	}

//edit- will not work as updatable=false in entity
	@Override
	public Master editMaster(Long masterId, UpdateMasterDto detachedMaster) {
		if (masterRepo.existsById(masterId)) {
			Master upMaster = getByMasterId(masterId);
			upMaster.setAdminTbl(adminService.getByAdminId(detachedMaster.getAdminId()));
			upMaster.setQuestionTbl(queService.getByQuestionId(detachedMaster.getQuestionId()));
			upMaster.setStudentTbl(studentService.getByStudentId(detachedMaster.getStudentId()));
			upMaster.setTestTbl(testService.getByTestId(detachedMaster.getStudentId()));
			return masterRepo.save(upMaster);
		}
		throw new ResourceNotFoundException("Invalid Master Id : Updation Failed");
	}

//find by student and test
	@Override
	public List<Master> getByStudentIdAndTestId(Long stdId, Long testId) {
		Student objStudent = studentService.getByStudentId(stdId);
		Test objTest = testService.getByTestId(testId);
		return masterRepo.findByStudentTblAndTestTbl(objStudent, objTest);
	}

	@Override
	public List<Master> getByAdminId(Long adminId) {
		Admin objAdmin = adminService.getByAdminId(adminId);
		return masterRepo.findByAdminTbl(objAdmin);
	}

//	@Override
//	public List<Master> getMasterByQuestionId(Question byQuestionTbl) {
//		return masterRepo.findByQuestionTbl(byQuestionTbl);
//	}

}
