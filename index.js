const baseUrl = 'http://api.login2explore.com:5577';
const iml = '/api/iml';
const irl = '/api/irl';
const dbName = 'School-DB';
const relationName = 'Student-Table';
const token = '90934608|-31949212585839325|90956320';

function create_put_request(token, dbName, relationName, jsonObj) {
    return {
        token: token,
        dbName: dbName,
        cmd: 'PUT',
        rel: relationName,
        jsonStr: jsonObj
    };
}

function create_update_request(token, dbName, relationName, rec_no, jsonStudentDataObj) {
    return {
        token: token,
        dbName: dbName,
        cmd: 'UPDATE',
        rel: relationName,
        jsonStr: {
            [rec_no] :{
                rollNo: jsonStudentDataObj.rollNo,
                fullName: jsonStudentDataObj.fullName,
                studentClass: jsonStudentDataObj.studentClass,
                birthDate: jsonStudentDataObj.birthDate,
                address: jsonStudentDataObj.address,
                enrollDate: jsonStudentDataObj.enrollDate
            }
        }
    }
}

function create_get_by_key_request(token, dbName, relationName, jsonObj) {
    return {
        token: token,
        dbName: dbName,
        cmd: 'GET_BY_KEY',
        rel: relationName,
        jsonStr: jsonObj
    };
}

function validateAndGetStudentData() {
    let rollNo, fullName, studentClass, birthDate, address, enrollDate;
    rollNo = $("#rollNo").val();
    if (rollNo === '') {
        alert('Roll number is required');
        $("#rollNo").focus();
        return {};
    }
    
    fullName = $("#fullName").val();
    if (fullName === '') {
        alert('Full name is required');
        $("#fullName").focus();
        return {};
    }
    else {
         // Trim and normalize spaces
        fullName = fullName.trim().replace(/\s+/g, ' ');
        // Validate full name format, should contain only letters and spaces
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(fullName)) {
            alert('Full name must contain only letters and spaces');
            $("#fullName").focus();
            return {};
        }
        // Convert to uppercase
        fullName = fullName.toUpperCase();
        $("#fullName").val(fullName);
    }

    studentClass = $("#studentClass").val();
    if (studentClass === '') {
        alert('Class is required');
        $("#studentClass").focus();
        return {};
    }
    else {
        //validates format, should be an roman numeral (I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XI)
        studentClass = studentClass.toUpperCase(); // Convert to uppercase for consistency
        $("#studentClass").val(studentClass);
        const classPattern = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)$/;
        if (!classPattern.test(studentClass)) {
            alert('Class must be a roman numeral (I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII)');
            $("#studentClass").focus();
            return {};
        }
    }

    birthDate = $("#birthDate").val();
    if (birthDate === '') {
        alert('Birth date is required');
        $("#birthDate").focus();
        return {};
    }
    else {
        // Validate birth date format (DD/MM/YYYY)
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(birthDate)) {
            alert('Birth date must be in DD/MM/YYYY format');
            $("#birthDate").focus();
            return null;
        }
    }

    address = $("#address").val();
    if (address === '') {
        alert('Address is required');
        $("#address").focus();
        return {};
    } 
    else {
        // Trim leading/trailing spaces and replace multiple spaces with a single space
        address = address.trim().replace(/\s+/g, ' ');
        // Convert to uppercase
        address = address.toUpperCase();
        $("#address").val(address);
    }

    enrollDate = $("#enrollDate").val();
    if (enrollDate === '') {
        alert('Enrollment date is required');
        $("#enrollDate").focus();
        return {};
    }
    else {
        // Validate enrollment date format (DD/MM/YYYY)
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(enrollDate)) {
            alert('Enrollment date must be in DD/MM/YYYY format');
            $("#enrollDate").focus();
            return null;
        }
    }

    let studentData = {
        rollNo: rollNo,
        fullName: fullName,
        studentClass: studentClass,
        birthDate: birthDate,
        address: address,
        enrollDate: enrollDate
    };
    console.log("jsonStudentDataObj: " + JSON.stringify(studentData));
    return studentData;
}

function executeCommandAtGivenBaseUrl(reqObj, dbBaseUrl, apiEndPointUrl) {
    let url = dbBaseUrl + apiEndPointUrl;
    let jsonObj;
    console.log("making request to "+ url + " with payload: " + JSON.stringify(reqObj));
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(reqObj),
        dataType: 'json',
        async: false,
        success: function(result) {
            jsonObj = result;
        },
        error: function(xhr) {
            jsonObj = xhr.responseJSON || JSON.parse(xhr.responseText);
        }
    });
    console.log("response received: " + JSON.stringify(jsonObj));
    return jsonObj;
}

function saveData() {
    let jsonStudentDataObj = validateAndGetStudentData();
    if (!jsonStudentDataObj) {
        return;
    }
    let putObj = create_put_request(token, dbName, relationName, jsonStudentDataObj);
    const responseObj = executeCommandAtGivenBaseUrl(putObj, baseUrl, iml);
    if (responseObj.status === 200) {
        alert('Data saved successfully');
        resetForm();
        $("#rollNo").focus();
    } 
    else {
        alert('Some unexpected error occurred');
        $("#rollNo").focus();
    }
}

function changeData() {
    $("#change").prop('disabled', true);
    let jsonStudentDataObj = validateAndGetStudentData();
    if (!jsonStudentDataObj) {
        return;
    }
    let keyObj = { rollNo: 
        jsonStudentDataObj.rollNo 
    };
    let requestObj = create_get_by_key_request(token, dbName, relationName, keyObj);
    const responseObj = executeCommandAtGivenBaseUrl(requestObj, baseUrl, irl);

    if(responseObj.status === 200) {
        let rec_no = JSON.parse(responseObj.data).rec_no;
        console.log("record number fetched: " + rec_no);

        let updateObj = create_update_request(token, dbName, relationName, rec_no, jsonStudentDataObj);
        console.log("fetching update request" + JSON.stringify(updateObj));

        const updateResponseObj = executeCommandAtGivenBaseUrl(updateObj, baseUrl, iml);
        console.log("update response: " + JSON.stringify(updateResponseObj));

        // Check if the update was successful
        if (updateResponseObj.status === 200) {
            alert('Data updated successfully');
            resetForm();
            $("#rollNo").focus();
        } 
        else {
            alert('Some unexpected error occurred while updating record');
            $("#rollNo").focus();
            return;
        }
    }
    else {
        alert('Some unexpected error occurred while fetching record');
        resetForm();
        $("#rollNo").prop('disabled', false);
        $("#rollNo").focus();
        return;
    }
}

function resetForm() {
    $("#rollNo").val('');
    $("#fullName").val('');
    $("#studentClass").val('');
    $("#birthDate").val('');
    $("#address").val('');
    $("#enrollDate").val('');
    $("#rollNo").prop('disabled', false);
    $("#save").prop('disabled', true);
    $("#change").prop('disabled', true);
    $("#reset").prop('disabled', true);
    $("#fullName").prop('disabled', true);
    $("#studentClass").prop('disabled', true);
    $("#birthDate").prop('disabled', true);
    $("#address").prop('disabled', true);
    $("#enrollDate").prop('disabled', true);
    $("#rollNo").focus();
}


function getStudent() {
    let rollNumber = $('#rollNo').val();
    if (rollNumber === '') {
        alert('Please enter a roll number');
        return;
    }
    let jsonObj = {
        rollNo: rollNumber
    };
    let requestObj = create_get_by_key_request(token, dbName, relationName, jsonObj);
    console.log("request payload "+ JSON.stringify(requestObj));
    const responseObj = executeCommandAtGivenBaseUrl(requestObj, baseUrl, irl);

    if(responseObj.status === 200) {
        $("#rollNo").prop('disabled', true);
        //fill the data
        let record = JSON.parse(responseObj.data).record;
        $("#fullName").val(record.fullName);
        $("#studentClass").val(record.studentClass);
        $("#birthDate").val(record.birthDate);
        $("#address").val(record.address);
        $("#enrollDate").val(record.enrollDate);

        $("#change").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#save").prop('disabled', true);

        $("#fullName").prop('disabled', false);
        $("#studentClass").prop('disabled', false);
        $("#birthDate").prop('disabled', false);
        $("#address").prop('disabled', false);
        $("#enrollDate").prop('disabled', false);

        $("#fullName").focus();
    }
    else if(responseObj.status === 400) {
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#change").prop('disabled', true);
        $("#fullName").prop('disabled', false);
        $("#studentClass").prop('disabled', false);
        $("#birthDate").prop('disabled', false);
        $("#address").prop('disabled', false);
        $("#enrollDate").prop('disabled', false);
        $("#fullName").focus();
    }
    else {
        alert('Some unexpected error occured');
        return;
    }
}