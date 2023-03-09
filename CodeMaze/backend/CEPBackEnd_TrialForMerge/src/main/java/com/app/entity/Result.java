//package com.app.entity;
//
//import java.io.Serializable;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.Lob;
//import javax.persistence.NamedQuery;
//import javax.persistence.OneToOne;
//import javax.persistence.Table;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//
//import lombok.Getter;
//import lombok.Setter;
//
///**
// * The persistent class for the result_tbl database table.
// * 
// */
//@Entity
//@Getter
//@Setter
//@Table(name = "result_tbl")
//@NamedQuery(name = "Result.findAll", query = "SELECT r FROM Result r")
//public class Result implements Serializable {
//	private static final long serialVersionUID = 1L;
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "result_id", nullable = false)
//	private long resultId;
//
//	@Lob
//	@Column(name = "result_code_answer")
//	private String resultCodeAnswer;
//
//	@Column(name = "result_obtained_marks")
//	private int resultObtainedMarks;
//
//	// bi-directional one-to-one association to Master
//	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonIgnoreProperties("resultTbl")
//	@JoinColumn(name = "result_master_id", referencedColumnName = "master_id", nullable = false)
//	private Master masterTbl;
//
//	public Result() {
//	}
//
//	public String getResultCodeAnswer() {
//		return this.resultCodeAnswer;
//	}
//
//	public void setResultCodeAnswer(String resultCodeAnswer) {
//		this.resultCodeAnswer = resultCodeAnswer;
//	}
//
//	public long getResultId() {
//		return this.resultId;
//	}
//
//	public void setResultId(long resultId) {
//		this.resultId = resultId;
//	}
//
//	public int getResultObtainedMarks() {
//		return this.resultObtainedMarks;
//	}
//
//	public void setResultObtainedMarks(int resultObtainedMarks) {
//		this.resultObtainedMarks = resultObtainedMarks;
//	}
//
//	public Master getMasterTbl() {
//		return this.masterTbl;
//	}
//
//	public void setMasterTbl(Master masterTbl) {
//		this.masterTbl = masterTbl;
//	}
//
//	public Result(String resultCodeAnswer, long resultId, int resultObtainedMarks, Master masterTbl) {
//		super();
//		this.resultCodeAnswer = resultCodeAnswer;
//		this.resultId = resultId;
//		this.resultObtainedMarks = resultObtainedMarks;
//		this.masterTbl = masterTbl;
//	}
//
//}