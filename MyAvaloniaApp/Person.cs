using System.ComponentModel.DataAnnotations;

public class Person
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }
    public int Edad { get; set; }

}
