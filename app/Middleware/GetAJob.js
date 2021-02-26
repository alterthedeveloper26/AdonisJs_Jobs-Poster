"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Job = use("App/Models/Job");

class GetAJob {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

  async handle({ request, params }, next) {
    // call next to advance the request
    request.job = await Job.find(params.id);
    await next();
  }
}

module.exports = GetAJob;
