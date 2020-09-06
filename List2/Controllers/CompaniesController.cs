using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using List2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace List2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        readonly ILogger<CompaniesController> _logger;
        CompaniesService _cService;
        public CompaniesController(ILogger<CompaniesController> logger, CompaniesService service)
        {
            _logger = logger;
            _cService = service;
        }

        [HttpGet]

        public ActionResult<CompaniesVM[]> GetAll()
        {
            try
            {
                return _cService.GetAll();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get products: {ex}");
                return BadRequest($"Failed to get products: {ex}");
            }
        }



        [Route("/create")]
        [HttpPost]
        public IActionResult Create(CompaniesVM company) // Model binding
        {

            _cService.Create(company);

            // Redirect to index
            return RedirectToAction("Index");
        }

        [Route("/update")]
        [HttpPost]
        public IActionResult Update(CompaniesVM company) // Model binding
        {

            _cService.Update(company);

            // Redirect to index
            return RedirectToAction("Index");
        }

        [Route("/delete")]
        [HttpPost]
        public IActionResult Delete(CompaniesVM company) // Model binding
        {
            int? id = company.Id;
            _cService.Delete(id);

            // Redirect to index
            return RedirectToAction("Index");
        }
    }
}