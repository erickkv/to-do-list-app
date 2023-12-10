import React, { useState } from 'react';
import { IonInput, IonButton, IonSelect, IonSelectOption, IonAlert } from '@ionic/react';

interface AddTaskProps {
  onAddTask: (name: string, description: string, type: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleAddTask = () => {
    if (name.trim() !== '' && description.trim() !== '' && type.trim() !== '') {
      onAddTask(name, description, type);
      setName('');
      setDescription('');
      setType('');
    } else {
      // Muestra algún mensaje de error o notificación al usuario
      console.error('Todos los campos son obligatorios');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <IonInput
        type="text"
        placeholder="Nombre"
        value={name}
        onIonChange={(e) => setName(e.detail.value!)}
      />
      <IonInput
        type="text"
        placeholder="Descripción"
        value={description}
        onIonChange={(e) => setDescription(e.detail.value!)}
      />
      <IonSelect
        value={type}
        placeholder="Selecciona un tipo"
        onIonChange={(e) => setType(e.detail.value)}
      >
        <IonSelectOption value="trabajo">Trabajo</IonSelectOption>
        <IonSelectOption value="casa">Casa</IonSelectOption>
        <IonSelectOption value="negocios">Negocios</IonSelectOption>
      </IonSelect>
      <IonButton onClick={handleAddTask}>Agregar tarea</IonButton>
      {/* IonAlert para mostrar el mensaje de error */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Error'}
        message={'Todos los campos son obligatorios'}
        buttons={['OK']}
      />
    </div>
  );
};

export default AddTask;
