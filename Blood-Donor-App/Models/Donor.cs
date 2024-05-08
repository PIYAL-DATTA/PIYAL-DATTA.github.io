using System.ComponentModel.DataAnnotations;

namespace Blood_Donor_App_v4.Models
{
    public class Donor
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
