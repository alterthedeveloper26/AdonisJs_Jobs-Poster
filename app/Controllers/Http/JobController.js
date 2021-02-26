"use strict";

const Job = use("App/Models/Job");

class JobController {
  //Render jobs for home page
  async home({ view }) {
    //Fetch a job
    const jobs = await Job.all();

    return view.render("index", { jobs: jobs.toJSON() });
  }

  async create({ request, response, view, auth, session }) {
    const { title, link, description } = request.all();

    const job = await auth.user.jobs().create({
      title,
      link,
      description,
    });

    session.flash({ message: "Your job has been posted" });
    return response.redirect("back");
  }

  async delete({ request, response, session, params }) {
    await request.job.delete();
    session.flash({ message: "Your post has been deleted" });

    return response.redirect("back");
  }

  async edit({ view, params, request }) {
    return view.render("edit", { job: request.job });
  }

  async update({ request, response, session, params }) {
    const job = request.job;
    const data = request.all();

    const { title, link, description } = data;
    console.log(`title: ${title}, link: ${link}, des: ${description}`);
    job.title = title;
    job.link = link;
    job.description = description;

    await job.save();

    session.flash({ message: "Your job has been updated." });
    return response.redirect("/post-a-job");
  }
}

module.exports = JobController;
