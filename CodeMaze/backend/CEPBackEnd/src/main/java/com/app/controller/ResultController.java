package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.CreateResultDto;
import com.app.dto.UpdateResultDto;
import com.app.entity.Result;
import com.app.entity.ResultPK;
import com.app.service.IResultService;

@RestController
@RequestMapping("/result")
public class ResultController {
//dependency for service class
	@Autowired
	IResultService resService;

//dependency of model mapper 
//	@Autowired
//	private ModelMapper mapper;

//nosrgconst
	public ResultController() {
	}

//getall
	@GetMapping
	public List<Result> getAll() {
		return resService.getAll();
	}

////getbyid
//	@GetMapping("/findbyid/{resultId}")
//	public ResponseEntity<?> getDetailsById(@PathVariable long resultId) {
//		try {
//			return new ResponseEntity<>(resService.getByResultId(resultId), HttpStatus.OK);
//		} catch (RuntimeException e) {
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//		}
//	}

//create-insert
//	@PostMapping("/create")
//	public Result addResult(@RequestBody CreateResultDto traResultDto) {
//		return resService.insertResult(traResultDto);
//	}

//create-insert by pathvariable
	@PostMapping("/create/{resultID}/{adminID}/{stdID}/{testID}/{queID}")
	public Result addResult(@PathVariable long resultID, @PathVariable long adminID, @PathVariable long stdID,
			@PathVariable long testID, @PathVariable long queID, @RequestBody CreateResultDto traResultDto) {
		ResultPK inResultPK = new ResultPK(resultID, adminID, stdID, testID, queID);
		return resService.insertResult(inResultPK, traResultDto);
	}

//delete
	@DeleteMapping("/remove/{resultID}/{adminID}/{stdID}/{testID}/{queID}")
	public ApiResponse removeResult(@PathVariable long resultID, @PathVariable long adminID, @PathVariable long stdID,
			@PathVariable long testID, @PathVariable long queID) {
		ResultPK delResultPK = new ResultPK(resultID, adminID, stdID, testID, queID);
		return new ApiResponse(resService.deleteResult(delResultPK));
	}

//update result
	@PutMapping("/update/{resultID}/{adminID}/{stdID}/{testID}/{queID}")
	public Result updateResult(@PathVariable long resultID, @PathVariable long adminID, @PathVariable long stdID,
			@PathVariable long testID, @PathVariable long queID, UpdateResultDto upResultDto) {
		ResultPK upResultPK = new ResultPK(resultID, adminID, stdID, testID, queID);
		return resService.editResult(upResultPK, upResultDto);
	}

}