import { Download, ImageUp, Link2, RefreshCcw, X } from 'lucide-react';
import { Button } from './ui/button';
import * as Progress from '@radix-ui/react-progress';
import { motion } from 'motion/react';
import { useUploads, type Upload } from '../store/uploads';
import { formatBytes } from '../utils/format-bytes';

interface UploadWidgetUploadItemProps {
  uploadId: string;
  upload: Upload;
}

export function UploadWidgetUploadItem({
  uploadId,
  upload,
}: UploadWidgetUploadItemProps) {
  const { cancelUpload } = useUploads();

  return (
    <motion.div
      className='p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className='flex flex-col gap-1'>
        <span className='text-xs font-medium flex items-center gap-1'>
          <ImageUp className='size-3 text-zinc-400' strokeWidth={1.5} />
          <span>{upload.name}</span>
        </span>

        <span className='text-xxs text-zinc-400 flex gap-1.5 items-center'>
          <span className='line-through'>{formatBytes(upload.file.size)}</span>

          <div className='size-1 rounded-full bg-zinc-700' />
          <span>
            300kB
            <span className='text-green-400 ml-1'>-94%</span>
          </span>

          <div className='size-1 rounded-full bg-zinc-700' />

          {upload.status === 'success' && <span>100%</span>}
          {upload.status === 'progress' && <span>45%</span>}
          {upload.status === 'error' && (
            <span className='text-red-400'>Error</span>
          )}
          {upload.status === 'canceled' && (
            <span className='text-yellow-400'>Canceled</span>
          )}
        </span>
      </div>

      <Progress.Root
        data-status={upload.status}
        className='group h-1 rounded-full bg-zinc-800 overflow-hidden'
      >
        <Progress.Indicator
          className='h-1 bg-indigo-500
          group-data-[status=success]:bg-green-400
          group-data-[status=error]:bg-red-400
          group-data-[status=canceled]:bg-yellow-400
          '
          style={{ width: upload.status === 'progress' ? '45%' : '100%' }}
        />
      </Progress.Root>

      <div className='absolute top-2.5 right-2.5 flex items-center gap-1'>
        <Button disabled={upload.status !== 'success'} size='icon-sm'>
          <Download className='size-4' strokeWidth={1.5} />
          <span className='sr-only'>Download compressed image</span>
        </Button>

        <Button disabled={upload.status !== 'success'} size='icon-sm'>
          <Link2 className='size-4' strokeWidth={1.5} />
          <span className='sr-only'>Copy remote URL</span>
        </Button>

        <Button
          disabled={!['canceled', 'error'].includes(upload.status)}
          size='icon-sm'
        >
          <RefreshCcw className='size-4' strokeWidth={1.5} />
          <span className='sr-only'>Retry upload</span>
        </Button>

        <Button
          disabled={upload.status !== 'progress'}
          size='icon-sm'
          onClick={() => cancelUpload(uploadId)}
        >
          <X className='size-4' strokeWidth={1.5} />
          <span className='sr-only'>Cancel upload</span>
        </Button>
      </div>
    </motion.div>
  );
}
