package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.CreateResultDto;
import com.app.dto.UpdateResultDto;
import com.app.entity.Result;
import com.app.entity.ResultPK;
import com.app.repository.IResultRepository;

@Service
@Transactional
public class ResultServiceImpl implements IResultService {
	@Autowired
	private IResultRepository resultRepo;

//get all list
	@Override
	public List<Result> getAll() {
		return resultRepo.findAll();
	}

//get by id
	@Override
	public Result getByResultId(ResultPK resultId) {
		return resultRepo.findById(resultId).get();
	}

//insert
//	@Override
//	public Result insertResult(CreateResultDto traResultDto) {
//		ResultPK traResultPK = new ResultPK(traResultDto.getResultId(), traResultDto.getResultAdminId(),
//				traResultDto.getResultStudentPrn(), traResultDto.getResultTestId(), traResultDto.getResultQuestionId());
//		Result traResult = new Result(traResultPK, traResultDto.getResultObtainedMarks(),
//				traResultDto.getResultCodeAnswer());
//		return resultRepo.save(traResult);
//	}

//insert pathvar	
	@Override
	public Result insertResult(ResultPK inResultPK, CreateResultDto traResultDto) {
		Result traResult = new Result(inResultPK, traResultDto.getResultObtainedMarks(),
				traResultDto.getResultCodeAnswer());
		return resultRepo.save(traResult);
	}

//delete
	@Override
	public String deleteResult(ResultPK delResultPK) {
		if (resultRepo.existsById(delResultPK)) {
			resultRepo.deleteById(delResultPK);
			return "Result Succesfully Deleted";
		}
		return "Result Deletion Failed : Invalid Id";
	}

//edit
	@Override
	public Result editResult(ResultPK edResultPk, UpdateResultDto detachedResult) {
		if (resultRepo.existsById(edResultPk)) {
			Result upResult = getByResultId(edResultPk);
			upResult.setResultCodeAnswer(detachedResult.getResultCodeAnswer());
			upResult.setResultObtainedMarks(detachedResult.getResultObtainedMarks());
			return resultRepo.save(upResult);
		}
		throw new ResourceNotFoundException("Invalid Result Id : Updation Failed");
	}

}
