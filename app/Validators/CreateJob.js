"use strict";

class CreateJob {
  get rules() {
    return {
      // validation rules
      title: "required",
      link: "required",
    };
  }

  get messages() {
    return { required: "{{field}} is empty" };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = CreateJob;
