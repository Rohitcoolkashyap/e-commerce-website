function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    //   the request was made and the server responsed with a status code that is not in the range
    errorMsg = error.response.data;
    console.log("Error response", errorMsg);

    //   for cloudinary image upload
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    //   the request was made but no response was received
    errorMsg = error.request;
    console.log("Error request", errorMsg);
  } else {
    //   something else happened in making the request triggered an error
    errorMsg = error.message;
    console.log(errorMsg);
  }
  displayError(errorMsg);
}
