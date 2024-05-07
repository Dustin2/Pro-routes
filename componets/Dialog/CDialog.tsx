import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';

interface CDialogPorps {
  title: string;
  body: string;
  onDismiss?: boolean;
  visible: boolean;
  icon?: 'url' | 'file';
  variant?: string | 'bodyMedium';
}

export const CDialog = ({
  variant,
  title,
  visible,
  body,
  icon,
  onDismiss,
}: CDialogPorps) => {
  return (
    <Portal>
      <Dialog visible={false} onDismiss={false}>
        <Dialog.Icon icon={icon} />
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant={variant}>{body}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});
