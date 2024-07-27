import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { CourseCardProps, Module } from "../../interfaces/CourseInterfaces";


const ModuleCard: React.FC<CourseCardProps  & { handleModuleClick: (moduleId: number, numbertype: number) => void }> = ({ modules, namemodulo, handleModuleClick }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      content={
        <>
          <Icon name="book" size={30} color="#4951FF" />
          <View style={{ flex: 1}}>
            <Text numberOfLines={1} ellipsizeMode="tail">{namemodulo}</Text>
          </View>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <ScrollView>
       {modules.map((module) => (
        
    <TouchableOpacity key={module.numbertype} onPress={() => handleModuleClick(module.module_id, module.numbertype)}>
      
      <ListItem key={module.numbertype} bottomDivider>
        {module.icon}
        <ListItem.Content>
          <ListItem.Title>{module.contentName}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      
    </TouchableOpacity>
  ))}
      </ScrollView>
    </ListItem.Accordion>
  );
};

export default ModuleCard;
