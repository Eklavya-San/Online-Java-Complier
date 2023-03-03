package com.app.service;

import java.util.List;

import com.app.dto.CreateResultDto;
import com.app.dto.UpdateResultDto;
import com.app.entity.Result;
import com.app.entity.ResultPK;

public interface IResultService {
//get all
	List<Result> getAll();

//get by id
	Result getByResultId(ResultPK resultId);

//insert
//	Result insertResult(CreateResultDto transientResult);
//delete
	String deleteResult(ResultPK delResultPK);

//edit
	Result editResult(ResultPK resultId, UpdateResultDto detachedResult);

//insert by path var
	Result insertResult(ResultPK inResultPK, CreateResultDto traResult);

}
