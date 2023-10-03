using System;
using System.Data;
using System.Data.SQLite;

public class Database
{
    private readonly string _connectionString;

    public Database(string databasePath)
    {
        _connectionString = $"Data Source={databasePath};";
    }

    public DataTable GetData()
    {
        using var connection = new SQLiteConnection(_connectionString);
        connection.Open();

        using var command = new SQLiteCommand("SELECT * FROM Table", connection);
        using var reader = command.ExecuteReader();

        var dataTable = new DataTable();
        dataTable.Load(reader);

        return dataTable;
    }
}