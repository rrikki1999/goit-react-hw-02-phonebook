export const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <>
      <ul>
        {contacts.map(item => {
          return (
            <li key={item.id} >
              <p >
                {item.name}:{' '}
                <span >{item.number}</span>
              </p>
              <button
                type="button"
                name="delete"
                
                onClick={() => onRemoveContact(item.id)}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};