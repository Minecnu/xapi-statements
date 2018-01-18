import Facade from '../../Facade';

export default (): Facade => {
  return {
    emitNewStatements: async () => { },
    clearRepo: async () => { },
    migrate: async () => { },
    rollback: async () => { },
  };
};
