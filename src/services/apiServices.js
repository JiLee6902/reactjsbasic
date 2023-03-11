import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  //call api
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  //call api
  //do trong postman truyền form data
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, {
    email: email,
    password: password,
    delay: 2000,
  });
};

const postSignup = (email, password, username) => {
  return axios.post(`api/v1/register`, {
    email: email,
    password: password,
    username: username,
  });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
};

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

const putUpdateQuiz = (id, description, name, difficulty, image) => {
  //call api
  //do trong postman truyền form data
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.put("api/v1/quiz", data);
};

const deleteQuiz = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const logout = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email,
    refresh_token,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};

const getQuizWithQA = (id) => {
  return axios.get(`api/v1/quiz-with-qa/${id}`);
};

const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

const getOverview = () => {
  return axios.get(`api/v1/overview`);
};

const refreshToken = (email, refresh_token) => {
  return axios.post("api/v1/refresh-token");
};

const updateProfile = (username, userImage) => {
  return axios.post("api/v1/profile", {
    username,
    userImage,
  });
};

const changePassword = (current_password, new_password) => {
  return axios.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};

const getHistory = () => {
  return axios.get(`api/v1/history`);
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postSignup,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  logout,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  getOverview,
  refreshToken,
  updateProfile,
  changePassword,
  getHistory
};
