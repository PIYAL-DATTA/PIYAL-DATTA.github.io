using Microsoft.AspNetCore.Mvc;

namespace Blood_Donor_App_v4.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
