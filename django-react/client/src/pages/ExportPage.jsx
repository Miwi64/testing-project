import { useState, useEffect } from 'react';
import { Selector } from '../components/Selector';
import { getAllTasks, getTask } from '../api/task.api';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import JsExcelTemplate from "js-excel-template";
import { saveAs } from 'file-saver'
import ExcelJS from 'exceljs'

export function ExportPage(){
    const values = ['PDF','Excel']
    const [selected, setSelected] = useState('PDF')
    const [templateData, setTemplateData] = useState(null)

    useEffect(
        ()=>{
            async function loadTemplate(){
                const response = await fetch('http://localhost:5173/template.xlsx')
                const arrayBuffer = await response.arrayBuffer()
                setTemplateData(arrayBuffer)
            }
            loadTemplate()
        },[]
    )

    const handleSelect = (event) => {
        const { value } = event.target
        setSelected(value)
    }

    const handleButtonClick = async () => {
        const { data } = await getAllTasks()
        const values = data.map( value => Object.values(value))
        if(selected === 'PDF'){
            const doc = new jsPDF()
            autoTable(doc, {
                head: [['ID', 'Title', 'Description', 'Done']],
                body: values
            })
            doc.save('table.pdf')
        }
        else{
            const ids = data.map(value => value.id)
            const workbook = new ExcelJS.Workbook()
            await workbook.xlsx.load(templateData).then(
                () => {
                        const sheetToDuplicate = workbook.getWorksheet('Tarea')
                        ids.forEach(id => {
                            const duplicatedSheet = workbook.addWorksheet(`Tarea ${id}`)
                            duplicatedSheet.model = Object.assign(sheetToDuplicate.model, {
                                mergeCells: sheetToDuplicate.model.merges
                            });
                            duplicatedSheet.name = `Tarea ${id}`
                            sheetToDuplicate.eachRow(function (row, rowNumber) {
                                row.eachCell(function (cell, colNumber) {
                                    let newText = cell.value
                                    newText = newText.replace('{id', `{id${id}`)
                                    newText = newText.replace('{task', `{task${id}`)
                                    duplicatedSheet.getCell(rowNumber, colNumber).value = newText
                                }); 
                            });
                        });
                        workbook.removeWorksheet('Tarea')
                }
            )
            workbook.xlsx.writeBuffer().then(async buffer => {
                const excelTemplate = await JsExcelTemplate.fromArrayBuffer(buffer)
                for (const id of ids) {
                  excelTemplate.set(`id${id}`, `${id}`)
                  const { data: task } = await getTask(id)
                  excelTemplate.set(`task${id}`, [task])
                }
                const blob = await excelTemplate.toBlob();
                saveAs(blob, "test.xlsx");
              });
              
        }
    }
    
    return(
        <div className='max-w-xl mx-auto'>
            <h1 className='mb-1 text-2xl'>Export data</h1>
            <p className='text-lg text-slate-400 mb-3'>Select export format</p>
            <Selector selectValue={selected} values={values} onChange={handleSelect}/>
            <button
            className='bg-indigo-500 p-3 rounded-lg w-full mt-5 hover:cursor-pointer'
            onClick={handleButtonClick}>
              Export
          </button>
        </div>
    )
}