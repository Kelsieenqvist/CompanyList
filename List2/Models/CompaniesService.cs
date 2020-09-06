using List2.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace List2.Models
{
    public class CompaniesService
    {

        MyContext _context;
        public CompaniesService(MyContext context)
        {
            _context = context;
        }

        public CompaniesVM[] GetAll()
        {
            return _context.Company.OrderBy(x => x.Name)
                .Select(x => new CompaniesVM
                {
                    Id = x.Id,
                    Name = x.Name,
                    Country = x.Country,
                    City = x.City,
                    Street = x.Street,
                    ZipCode = x.ZipCode
                })
                .ToArray();

        }

        public CompaniesVM GetCompanyById(int id)
        {
            return _context.Company
                .Where(x => x.Id == id)
                .Select(x => new CompaniesVM
                {
                    Name = x.Name,
                    Country = x.Country,
                    City = x.City,
                    Street = x.Street,
                    ZipCode = x.ZipCode

                }).FirstOrDefault();
        }

        public void Create(CompaniesVM company)
        {
            _context.Company.Add(new Company
            {
                Name = company.Name,
                Country = company.Country,
                City = company.City,
                Street = company.Street,
                ZipCode = company.ZipCode
            });
            _context.SaveChangesAsync();
        }

        public void Update(CompaniesVM company)
        {
            var data = _context.Company.FirstOrDefault(x => x.Id == company.Id);
            if (data != null)
            {
                data.Name = company.Name;
                data.Country = company.Country;
                data.City = company.City;
                data.Street = company.Street;
                data.ZipCode = company.ZipCode;

            }
            _context.SaveChangesAsync();
        }

        public string Delete(int? Id)
        {
            var company = _context.Company.SingleOrDefault(x => x.Id == Id);
            if (company != null)
            {
                _context.Company.Remove(company);
                _context.SaveChanges();
            }
            return "Deleted";
        }
    }
}
