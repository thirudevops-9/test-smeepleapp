export type ExistingFile = {id: number; fileName: string; url: string; type: 'existing'};
export type NewFile = {file: File; tempId: string; type: 'new'; fileName: string};
export type NewOrExistingFile = ExistingFile | NewFile;
