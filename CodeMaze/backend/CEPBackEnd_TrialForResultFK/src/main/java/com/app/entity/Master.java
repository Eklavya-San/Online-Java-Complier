package com.app.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The persistent class for the master_tbl database table.
 * 
 */
@Entity
@Table(name = "master_tbl")
//@AllArgsConstructor
@NamedQuery(name = "Master.findAll", query = "SELECT m FROM Master m")
public class Master implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "master_id", nullable = false)
	private long masterId;

	// bi-directional many-to-one association to Admin
	@ManyToOne
	@JoinColumn(name = "admin_id", nullable = false, insertable = true, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Admin adminTbl;

	// bi-directional many-to-one association to Student
	@ManyToOne
	@JoinColumn(name = "student_prn", nullable = false, insertable = true, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Student studentTbl;

	// bi-directional many-to-one association to Test
	@ManyToOne
	@JoinColumn(name = "test_id", nullable = false, insertable = true, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Test testTbl;

	// bi-directional many-to-one association to Question
	@ManyToOne
	@JoinColumn(name = "question_id", nullable = false, insertable = true, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Question questionTbl;

	// bi-directional one-to-one association to Result
	// @JsonBackReference
	@JsonIgnoreProperties("masterTbl")
	@OneToOne(mappedBy = "masterTbl", cascade = CascadeType.ALL, orphanRemoval = true)
	private Result resultTbl;

	public Master() {
	}

	public long getMasterId() {
		return masterId;
	}

	public void setMasterId(long masterId) {
		this.masterId = masterId;
	}

	public Admin getAdminTbl() {
		return adminTbl;
	}

	public void setAdminTbl(Admin adminTbl) {
		this.adminTbl = adminTbl;
	}

	public Student getStudentTbl() {
		return studentTbl;
	}

	public void setStudentTbl(Student studentTbl) {
		this.studentTbl = studentTbl;
	}

	public Test getTestTbl() {
		return testTbl;
	}

	public void setTestTbl(Test testTbl) {
		this.testTbl = testTbl;
	}

	public Question getQuestionTbl() {
		return questionTbl;
	}

	public void setQuestionTbl(Question questionTbl) {
		this.questionTbl = questionTbl;
	}

	public Result getResultTbl() {
		return resultTbl;
	}

	public Master(long masterId, Admin adminTbl, Student studentTbl, Test testTbl, Question questionTbl) {
		super();
		this.masterId = masterId;
		this.adminTbl = adminTbl;
		this.studentTbl = studentTbl;
		this.testTbl = testTbl;
		this.questionTbl = questionTbl;
	}

}