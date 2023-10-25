using Microsoft.Data.Sqlite;
using Microsoft.JSInterop;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace BlazorApp1
{
    public class Database
    {
        private readonly string _connectionString;

        public Database(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Datas> GetData()
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            using var command = new SqliteCommand("SELECT * FROM Datos", connection);
            using var reader = command.ExecuteReader();

            var dataList = new List<Datas>();

            while (reader.Read())
            {
                var data = new Datas
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Edad = reader.GetInt32(2)
                };

                dataList.Add(data);
            }

            return dataList;
        }
        
    }
}
