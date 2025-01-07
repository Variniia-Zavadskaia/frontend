import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadEntry, addEntryMsg } from '../store/actions/entry.actions'


export function EntryDetails() {

  const {entryId} = useParams()
  const entry = useSelector(storeState => storeState.entryModule.entry)

  useEffect(() => {
    loadEntry(entryId)
  }, [entryId])

  async function onAddEntryMsg(entryId) {
    try {
        await addEntryMsg(entryId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Entry msg added`)
    } catch (err) {
        showErrorMsg('Cannot add entry msg')
    }        

}

  return (
    <section className="entry-details">
      <Link to="/entry">Back to list</Link>
      <h1>Entry Details</h1>
      {entry && <div>
        <h3>{entry.vendor}</h3>
        <h4>${entry.price}</h4>
        <pre> {JSON.stringify(entry, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddEntryMsg(entry._id) }}>Add entry msg</button>

    </section>
  )
}