"use strict";

class LoginUser {
  get rules() {
    return {
      // validation rules
      email: "required|email",
      password: "required",
    };
  }

  getMessages() {
    return { required: "{{field}} is required" };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = LoginUser;
