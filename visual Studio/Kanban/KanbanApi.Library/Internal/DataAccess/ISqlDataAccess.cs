using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KanbanApi.Library.Internal.DataAccess
{
    public interface ISqlDataAccess : IDisposable
    {
        /// <summary>
        /// Get the connetion string you have selected
        /// </summary>
        /// <param name="connectionString">Name of the connetion string you want to use</param>
        /// <returns></returns>
        string GetConnectionString(string connectionString);

        /// used to dispose if an error acordes
        new void Dispose();

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
        List<T> LoadData<T, U>(string storedProcedure, U parameters, string connectionStringName);
        /// <summary>
        /// execute stored procedure to save data from database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <exception cref="NotImplementedException"></exception>
        void SaveData<T>(string storedProcedure, T parameters, string connectionStringName);

        List<T> SaveData<T, U>(string storedProcedure, U parameters, string connectionStringName);


        /// <summary>
        /// execute stored procedure to delete data from database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <exception cref="NotImplementedException"></exception>
        void DeleteData<T>(string storedProcedure, T parameters, string connectionStringName);
        /// <summary>
        /// execute stored procedure to update data in database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="storedProcedure">name of stored procedure to execute</param>
        /// <param name="parameters">the parameters the stored procedure require</param>
        /// <param name="connectionStringName">the name of the connection to execute stored procedure on</param>
        /// <exception cref="NotImplementedException"></exception>
        void UpdateData<T>(string storedProcedure, T parameters, string connectionStringName);

    }
}
