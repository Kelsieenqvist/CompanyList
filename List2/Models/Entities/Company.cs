using System;
using System.Collections.Generic;

namespace List2.Models.Entities
{
    public partial class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
    }
}
