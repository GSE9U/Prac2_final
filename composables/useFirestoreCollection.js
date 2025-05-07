import {
  onSnapshot,
  where,
  query,
} from 'firebase/firestore'
import { ref, computed } from 'vue'
import isEqual from 'lodash/isEqual'
import { useFirestore } from './useFirestore'

export const useFirestoreCollection = () => {
  const { path, error, clearError, add, setPath, update, getCollection } = useFirestore()

  const filter = ref([])
  const documents = ref({})
  const listener = ref()
  const ids = computed(() => Object.keys(documents.value))

  const docsArray = computed(() =>
    ids.value.map((id) => ({ id, ...documents.value[id] }))
  )

  function unsubscribe() {
    if (listener.value) {
      listener.value()
      listener.value = undefined
      documents.value = {}
      setPath('')
      filter.value = []
      clearError()
    }
  }

  function getQuery() {
    const col = getCollection()
    if (filter.value.length > 0)
      return query(col, ...filter.value.map((f) => where(f[0], f[1], f[2])))
    else return col
  }

  function onSnapshotChange(change) {
    const { type, doc } = change
    if (type === 'added' || type === 'modified') {
      documents.value[doc.id] = doc.data()
    }
    if (type === 'removed') {
      delete documents.value[doc.id]
    }
  }

  function subscribe(newPath, ...newFilter) {
    if (path.value !== newPath || !isEqual(filter.value, newFilter)) {
      unsubscribe()
      clearError()
      setPath(newPath)
      filter.value = newFilter
      if (newPath) {
        listener.value = onSnapshot(
          getQuery(),
          (snapshot) => {
            snapshot.docChanges().forEach(onSnapshotChange)
          },
          (err) => {
            error.value = err.message
          }
        )
      }
    }
  }

  return {
    path,
    filter,
    documents,
    listener,
    error,
    ids,
    docsArray,
    unsubscribe,
    subscribe,
    clearError,
    add,
    update,
  }
} 