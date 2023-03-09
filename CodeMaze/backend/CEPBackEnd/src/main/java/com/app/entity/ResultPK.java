package com.app.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Getter;
import lombok.Setter;

/**
 * The primary key class forb b the result_tbl database table.
 * 
 */
@Embeddable
@Getter
@Setter
public class ResultPK implements Serializable {
	// default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "result_id",unique = true, nullable = false)
	private long resultId;

	@Column(name = "result_admin_id", nullable = false)
	private long resultAdminId;

	@Column(name = "result_student_prn", nullable = false)
	private long resultStudentPrn;

	@Column(name = "result_test_id", nullable = false)
	private long resultTestId;

	@Column(name = "result_question_id", nullable = false)
	private long resultQuestionId;

	public ResultPK() {
	}

	public long getResultId() {
		return this.resultId;
	}

	public void setResultId(long resultId) {
		this.resultId = resultId;
	}

	public long getResultAdminId() {
		return this.resultAdminId;
	}

	public void setResultAdminId(long resultAdminId) {
		this.resultAdminId = resultAdminId;
	}

	public long getResultStudentPrn() {
		return this.resultStudentPrn;
	}

	public void setResultStudentPrn(long resultStudentPrn) {
		this.resultStudentPrn = resultStudentPrn;
	}

	public long getResultTestId() {
		return this.resultTestId;
	}

	public void setResultTestId(long resultTestId) {
		this.resultTestId = resultTestId;
	}

	public long getResultQuestionId() {
		return this.resultQuestionId;
	}

	public void setResultQuestionId(long resultQuestionId) {
		this.resultQuestionId = resultQuestionId;
	}
	

	public ResultPK(long resultId, long resultAdminId, long resultStudentPrn, long resultTestId,
			long resultQuestionId) {
		super();
		this.resultId = resultId;
		this.resultAdminId = resultAdminId;
		this.resultStudentPrn = resultStudentPrn;
		this.resultTestId = resultTestId;
		this.resultQuestionId = resultQuestionId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ResultPK)) {
			return false;
		}
		ResultPK castOther = (ResultPK) other;
		return (this.resultId == castOther.resultId) && (this.resultAdminId == castOther.resultAdminId)
				&& (this.resultStudentPrn == castOther.resultStudentPrn)
				&& (this.resultTestId == castOther.resultTestId)
				&& (this.resultQuestionId == castOther.resultQuestionId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
//		hash = hash * prime + this.resultId;
		hash = hash * prime + ((int) (this.resultId ^ (this.resultId >>> 32)));
		hash = hash * prime + ((int) (this.resultAdminId ^ (this.resultAdminId >>> 32)));
		hash = hash * prime + ((int) (this.resultStudentPrn ^ (this.resultStudentPrn >>> 32)));
		hash = hash * prime + ((int) (this.resultTestId ^ (this.resultTestId >>> 32)));
		hash = hash * prime + ((int) (this.resultQuestionId ^ (this.resultQuestionId >>> 32)));

		return hash;
	}
}