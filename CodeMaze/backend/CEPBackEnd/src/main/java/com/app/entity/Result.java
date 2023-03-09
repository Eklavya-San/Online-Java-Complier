package com.app.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.Lob;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

/**
 * The persistent class for the result_tbl database table.
 * 
 */
@Entity
@Getter
@Setter
@Table(name = "result_tbl")
@NamedQuery(name = "Result.findAll", query = "SELECT r FROM Result r")
public class Result implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ResultPK id;

	@Column(name = "result_obtained_marks")
	private int resultObtainedMarks;

	@Lob
	@Column(name = "result_code_answer")
	private String resultCodeAnswer;

	// bi-directional one-to-one association to Master
//	@JsonManagedReference
	@JsonIgnoreProperties("resultTbl")
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumns({
			@JoinColumn(name = "result_admin_id", referencedColumnName = "admin_id", nullable = false, insertable = false, updatable = false),
			@JoinColumn(name = "result_question_id", referencedColumnName = "question_id", nullable = false, insertable = false, updatable = false),
			@JoinColumn(name = "result_student_prn", referencedColumnName = "student_prn", nullable = false, insertable = false, updatable = false),
			@JoinColumn(name = "result_test_id", referencedColumnName = "test_id", nullable = false, insertable = false, updatable = false) })
	private Master masterTbl;

	public Result() {
	}

	public ResultPK getId() {
		return this.id;
	}

	public void setId(ResultPK id) {
		this.id = id;
	}

	public Object getResultCodeAnswer() {
		return this.resultCodeAnswer;
	}

	public void setResultCodeAnswer(String resultCodeAnswer) {
		this.resultCodeAnswer = resultCodeAnswer;
	}

	public int getResultObtainedMarks() {
		return this.resultObtainedMarks;
	}

	public void setResultObtainedMarks(int resultObtainedMarks) {
		this.resultObtainedMarks = resultObtainedMarks;
	}

	public Master getMasterTbl() {
		return this.masterTbl;
	}

	public void setMasterTbl(Master masterTbl) {
		this.masterTbl = masterTbl;
	}

	public Result(ResultPK id, int resultObtainedMarks, String resultCodeAnswer) {
		super();
		this.id = id;
		this.resultObtainedMarks = resultObtainedMarks;
		this.resultCodeAnswer = resultCodeAnswer;
	}

}