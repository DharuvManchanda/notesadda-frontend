import { Button } from '@/components/ui/button';
import { Trash2, Edit, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (url: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  isApproveDisabled?: (row: any) => boolean;
  isRejectDisabled?: (row: any) => boolean;
}

export function AdminTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView, 
  onApprove, 
  onReject,
  isApproveDisabled,
  isRejectDisabled
}: AdminTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left font-semibold"
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50 transition-colors">
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className="px-6 py-3 text-foreground">
                  {row[column.key]}
                </td>
              ))}
              <td className="px-6 py-3">
                <div className="flex gap-2">
   {onView && row.viewUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView(row.viewUrl)}
                      title="View"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onApprove && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onApprove(row.id)}
                      title="Approve"
                      disabled={isApproveDisabled?.(row)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 disabled:opacity-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReject(row.id)}
                      title="Reject"
                      disabled={isRejectDisabled?.(row)}
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(row.id)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(row.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
