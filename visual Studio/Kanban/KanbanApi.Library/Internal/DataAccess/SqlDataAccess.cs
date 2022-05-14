using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.Internal.DataAccess
{
    public class SqlDataAccess : IDisposable, ISqlDataAccess
    {
        private readonly IConfiguration _config;
        private readonly ILogger<SqlDataAccess> _logger;

        public SqlDataAccess(IConfiguration config, ILogger<SqlDataAccess> logger)
        {
            _config = config;
            _logger = logger;
        }


        /// <summary>
        /// execute stored procedure to delete data from database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <exception cref="NotImplementedException"></exception>
        public void DeleteData<T>(string storedProcedure, T parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);

            using IDbConnection conn = new SqlConnection(connectionString);
            conn.Execute(storedProcedure, parameters,
                commandType: CommandType.StoredProcedure);
        }
        
        /// used to dispose if an error acordes
        public void Dispose()
        {

        }


        /// <summary>
        /// Get the connetion string you have selected
        /// </summary>
        /// <param name="connectionString">Name of the connetion string you want to use</param>
        /// <returns></returns>
        public string GetConnectionString(string connectionString)
        {
            return _config.GetConnectionString(connectionString);
        }

        /// <summary>
        /// execute stored procedure to Load data from database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="U"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<T> LoadData<T, U>(string storedProcedure, U parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);

            using IDbConnection conn = new SqlConnection(connectionString);
            List<T> rows = conn.Query<T>(storedProcedure, parameters,
                commandType: CommandType.StoredProcedure).ToList();

            return rows;
        }

        /// <summary>
        /// execute stored procedure to save data from database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <exception cref="NotImplementedException"></exception>
        public void SaveData<T>(string storedProcedure, T parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);

            using IDbConnection conn = new SqlConnection(connectionString);
            conn.Execute(storedProcedure, parameters,
                commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// execute stored procedure to update data in database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <exception cref="NotImplementedException"></exception>
        public void UpdateData<T>(string storedProcedure, T parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);

            using IDbConnection conn = new SqlConnection(connectionString);
            conn.Execute(storedProcedure, parameters,
                commandType: CommandType.StoredProcedure);
        }
    }
}
