import { collection, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { db } from '~/services/Fireinit'

export const useFirestore = () => {
  const path = ref('')
  const error = ref('')

  function getCollection() {
    return collection(db, path.value)
  }

  function clearError() {
    error.value = ''
  }

  function setPath(newPath) {
    path.value = newPath
  }

  async function add(d) {
    const docRef = await addDoc(getCollection(), d)
    return docRef.id
  }

  function getDocRef(id) {
    return doc(db, path.value, id)
  }

  async function update(id, changes) {
    await setDoc(getDocRef(id), changes, { merge: true })
  }

  async function remove(id) {
    await deleteDoc(getDocRef(id))
  }

  return {
    path,
    error,
    setPath,
    clearError,
    add,
    update,
    remove,
    getCollection,
    getDocRef,
  }
} 