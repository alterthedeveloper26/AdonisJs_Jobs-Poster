"use strict";

const User = use("App/Models/User");

class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(["username", "email", "password"])
    );

    await auth.login(user);
    return response.redirect("/");
  }

  async login({ request, response, auth, session }) {
    const { email, password } = request.all();

    try {
      await auth.attemp(email, password);
      return response.redirect("/");
    } catch (error) {
      session.flash({ loginError: "Fail authentication!!!" });
      response.redirect("./login");
    }
  }

  async userIndex({ view, auth }) {
    const jobs = await auth.user.jobs().fetch();

    return view.render("job", { jobs: jobs.toJSON() });
  }
}

module.exports = UserController;
