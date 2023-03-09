package com.app.service;

import java.util.List;

import com.app.dto.CreateResultDto;
import com.app.dto.UpdateResultDto;
import com.app.entity.Result;

public interface IResultService {
//get all
	List<Result> getAll();

//get by id
	Result getByResultId(Long resultId);

//insert
//	Result insertResult(CreateResultDto transientResult);
//delete
	String deleteResult(Long delResultPK);

//edit
	Result editResult(Long resultId, UpdateResultDto detachedResult);

//insert by path var
	Result insertResult(Long inResultPK, CreateResultDto traResult);

}
