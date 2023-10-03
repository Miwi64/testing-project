using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;
using Microsoft.EntityFrameworkCore;

namespace MyAvaloniaApp;

public partial class MainWindow : Window
{
    public DataGrid dataGrid;

    public MainWindow()
    {
        InitializeComponent();
        dataGrid = this.FindControl<DataGrid>("dataGrid");
        LoadData();
    }

    public void LoadData()
    {
        using (var context = new AppDbContext())
        {
            dataGrid.Items = new Avalonia.Collections.DataGridCollectionView(context.People.ToList());
        }
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }
}