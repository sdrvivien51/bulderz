'use client';

import AttachesTool from '@editorjs/attaches';
import { toast } from 'sonner';

export class MyAttachesTool extends AttachesTool {
  static get toolbox() {
    return {
      title: 'Fichier',
      icon: '<svg width="17" height="15" viewBox="0 0 17 15" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 3.02c-.28-.28-.64-.42-1.06-.42H5.92l-.66-1.1C5.12 1.2 4.76 1 4.34 1H1.06C.64 1 .28 1.14 0 1.42c-.28.28-.42.64-.42 1.06v10.04c0 .42.14.78.42 1.06.28.28.64.42 1.06.42h14.28c.42 0 .78-.14 1.06-.42.28-.28.42-.64.42-1.06V4.08c0-.42-.14-.78-.42-1.06zM15.36 12.5H1.06V2.5h2.72l.66 1.1c.14.3.5.5.92.5h10.54v8.4z"/></svg>'
    };
  }

  async removed() {
    try {
      const fileUrl = this.data?.file?.url;
      console.log('[MyAttachesTool] Initial data:', this.data);

      if (!fileUrl || !fileUrl.includes('blog-attachments')) {
        return;
      }

      const fileName = fileUrl.split('blog-attachments/').pop();

      if (!fileName || !/^[0-9]+-[\w\-. ]+$/.test(fileName)) {
        throw new Error('Nom de fichier invalide');
      }

      const loadingToast = toast.loading('Suppression en cours...');

      const response = await fetch('/api/delete-attachment', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filePath: fileName })
      });

      toast.dismiss(loadingToast);

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erreur lors de la suppression');
        return;
      }

      console.log('[MyAttachesTool] File successfully deleted:', fileName);
      toast.success('Fichier supprimé avec succès');
    } catch (error) {
      console.error('[MyAttachesTool] Error during deletion:', error);
      toast.error('Erreur lors de la suppression du fichier');
    }
  }
}
