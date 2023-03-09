package com.app.service;

import java.util.List;

import com.app.dto.UpdateMasterDto;
import com.app.entity.Master;

public interface IMasterService {
//get all
	List<Master> getAll();

//get by id
	Master getByMasterId(Long masterId);

//get by stdid and testid
	List<Master> getByStudentIdAndTestId(Long stdId, Long testId);

//insert
	Master insertMaster(Long masterID, Long adminID, Long stdID, Long testID, Long queID);

//delete
	String deleteMaster(Long id);

//edit- will not work as updatable=false in entity
	Master editMaster(Long masterId, UpdateMasterDto detachedMaster);
//get by question id
//	List<Master> getMasterByQuestionId(Question questiontbl);

	List<Master> getByAdminId(Long adminId);

}
