package com.app.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
@NamedQuery(name = "Master.findAll", query = "SELECT m FROM Master m")
public class Master implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private MasterPK id;

	// bi-directional many-to-one association to Admin
	@ManyToOne
	@JoinColumn(name = "admin_id", nullable = false, insertable = false, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Admin adminTbl;

	// bi-directional many-to-one association to Student
	@ManyToOne
	@JoinColumn(name = "student_prn", nullable = false, insertable = false, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Student studentTbl;

	// bi-directional many-to-one association to Test
	@ManyToOne
	@JoinColumn(name = "test_id", nullable = false, insertable = false, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Test testTbl;

	// bi-directional many-to-one association to Question
	@ManyToOne
	@JoinColumn(name = "question_id", nullable = false, insertable = false, updatable = false)
	@JsonIgnoreProperties("masterTbls")
	private Question questionTbl;

	// bi-directional one-to-one association to Result
	// @JsonBackReference
	@JsonIgnoreProperties("masterTbl")
	@OneToOne(mappedBy = "masterTbl", cascade = CascadeType.ALL, orphanRemoval = true)
	private Result resultTbl;

	public Master() {
	}

	public MasterPK getId() {
		return this.id;
	}

	public void setId(MasterPK id) {
		this.id = id;
	}

	public Admin getAdminTbl() {
		return this.adminTbl;
	}

	public void setAdminTbl(Admin adminTbl) {
		this.adminTbl = adminTbl;
	}

	public Question getQuestionTbl() {
		return this.questionTbl;
	}

	public void setQuestionTbl(Question questionTbl) {
		this.questionTbl = questionTbl;
	}

	public Student getStudentTbl() {
		return this.studentTbl;
	}

	public void setStudentTbl(Student studentTbl) {
		this.studentTbl = studentTbl;
	}

	public Test getTestTbl() {
		return this.testTbl;
	}

	public void setTestTbl(Test testTbl) {
		this.testTbl = testTbl;
	}

	public Result getResultTbl() {
		return this.resultTbl;
	}

	public void setResultTbl(Result resultTbl) {
		this.resultTbl = resultTbl;
	}

}