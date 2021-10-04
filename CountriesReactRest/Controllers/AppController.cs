using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CountriesReactRest.Controllers
{
    public class AppController : Controller
    {
        [HttpGet]
        public virtual String GetVisitedCountries()
        {
            //in a real application this data would be some how stored in a db (probably a lookup table between a user and country entry)
            //but I'm working on react with API calls, so we will ignore that since it's not important here
            //This also depends on the names matching the common name used by the rest api, which probably also isn't
            //ideal in the real world, but this is beyond the scope of what I'm working on.
            var visitedCountriesJsonData = "{ \"Countries\" : [\"Vietnam\",  \"South Korea\", \"Thailand\", \"Finland\", \"Czech Republic\", \"United Kingdom\", \"Germany\", \"Austria\", \"United States\"]}";

            return visitedCountriesJsonData;
        }
    }
}
