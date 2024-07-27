import * as React from 'react';
import { List } from 'react-native-paper';
import { DocumentType as MyDocumentType } from '../../interfaces/UserInterfaces';

interface Props {
    title: string;
    documentTypes: MyDocumentType[] | null;
    selectedItem: MyDocumentType | { document_id: 1, name: 'DNI' };
    onSelect: (documentType: MyDocumentType) => void;
}

const CustomAccordionList = ({ documentTypes, title, selectedItem, onSelect }: Props) => {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [selectedTitle, setSelectedTitle] = React.useState<string | null>(title);
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const handleSelect = (documentType: MyDocumentType) => {
        setSelectedId(documentType.document_id);
        setSelectedTitle(documentType.name);
    };

    return (
        <List.Section style={{marginBottom: 10 }}>
            <List.Accordion
                title={selectedTitle ?? title}
                
                left={props => <List.Icon {...props} icon="file-account" color='#2B32CE'/>}
                
                expanded={expanded}
                key={selectedId}
                rippleColor={"#4951FF"}
                onPress={handlePress}>
                {documentTypes?.map(documentType => (
                    <List.Item
                        title={documentType.name}
                        key={documentType.document_id}
                        onPress={() => {
                            handleSelect(documentType);
                            onSelect(documentType);
                        }} />
                ))}
            </List.Accordion>
        </List.Section>
    );
};

export default CustomAccordionList;