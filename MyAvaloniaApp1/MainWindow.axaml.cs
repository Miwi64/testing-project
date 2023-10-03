using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using System.Data;

namespace MyAvaloniaApp1
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
#if DEBUG
            this.AttachDevTools();
#endif
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var database = new Database("data.db");
            var dataTable = database.GetData();

            var dataGrid = this.FindControl<DataGrid>("dataGrid");
            dataGrid.Items = dataTable.DefaultView;
        }
    }
}