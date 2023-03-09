package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Admin;
import com.app.entity.Master;
import com.app.entity.Student;
import com.app.entity.Test;

public interface IMasterRepository extends JpaRepository<Master, Long> {

	// find by std and test
	List<Master> findByStudentTblAndTestTbl(Student std, Test test);

	// find by admin
	List<Master> findByAdminTbl(Admin admin);

}
