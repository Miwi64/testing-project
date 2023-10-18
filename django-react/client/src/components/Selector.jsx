export function Selector({ selectValue, values, onChange }){
  return (
    <select className='w-full p-3 text-lg bg-zinc-700 rounded-lg block' value={selectValue} onChange={onChange}>
        {values.map(
            (value, key) => (<option key={key} value={value}>{value}</option>)
        )}
    </select>
  )
}