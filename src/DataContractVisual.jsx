/*
 * Copyright 2026 Joao Vicente
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

export default function DataContractVisual({ data }) {
    // data is the full YAML object for the Data Contract

    const schema = data.schema || [];
    // Handle schema being array or object (in case of future changes, but currently array of tables)
    // The current YAML structure shows schema as a list of tables, each with properties (columns)

    // Flatten properties from all tables for a simpler view, or show by table
    // The example YAML has one table per contract typically, but let's map it.

    return (
        <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0', color: '#111827', fontFamily: 'monospace' }}>
                    {data.id}
                </h2>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', alignItems: 'center' }}>
                    <span style={{
                        background: '#dcfce7',
                        color: '#166534',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '11px'
                    }}>
                        {data.status}
                    </span>
                    <span style={{ color: '#6b7280' }}>Version: <strong style={{ color: '#374151' }}>{data.version}</strong></span>
                    <span style={{ color: '#6b7280' }}>API: <strong style={{ color: '#374151' }}>{data.apiVersion}</strong></span>
                </div>
                {data.description && data.description.purpose && (
                    <div style={{ marginTop: '12px', fontSize: '14px', color: '#4b5563', fontStyle: 'italic' }}>
                        "{data.description.purpose}"
                    </div>
                )}
            </div>

            {/* Schema Section */}
            <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Schema
                </h3>

                {schema.map((table, tIdx) => (
                    <div key={tIdx} style={{ marginBottom: '24px' }}>
                        <div style={{ marginBottom: '4px', fontWeight: '600', fontSize: '13px', color: '#4b5563' }}>
                            Table: <span style={{ fontFamily: 'monospace', color: '#2563eb' }}>{table.name}</span>
                        </div>
                        {table.description && (
                            <div style={{ marginBottom: '12px', fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>
                                {table.description}
                            </div>
                        )}
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                                <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <tr>
                                        <th style={{ padding: '10px 12px', fontWeight: '600', color: '#4b5563' }}>Column</th>
                                        <th style={{ padding: '10px 12px', fontWeight: '600', color: '#4b5563' }}>Logical Type</th>
                                        <th style={{ padding: '10px 12px', fontWeight: '600', color: '#4b5563' }}>Physical Type</th>
                                        <th style={{ padding: '10px 12px', fontWeight: '600', color: '#4b5563' }}>Examples</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.properties && table.properties.map((col, cIdx) => (
                                        <tr key={cIdx} style={{ borderBottom: cIdx < table.properties.length - 1 ? '1px solid #f3f4f6' : 'none', background: 'white' }}>
                                            <td style={{ padding: '10px 12px', fontWeight: '500', color: '#1f2937', fontFamily: 'monospace' }}>
                                                {col.name}
                                                {col.primaryKey && <span style={{ marginLeft: '6px', fontSize: '9px', color: '#d97706', border: '1px solid #fcd34d', padding: '1px 4px', borderRadius: '4px' }}>PK</span>}
                                            </td>
                                            <td style={{ padding: '10px 12px', color: '#4b5563' }}>{col.logicalType}</td>
                                            <td style={{ padding: '10px 12px', color: '#6b7280', fontSize: '12px' }}>{col.physicalType}</td>
                                            <td style={{ padding: '10px 12px', color: '#9ca3af', fontStyle: 'italic', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {col.examples ? col.examples.join(', ') : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
