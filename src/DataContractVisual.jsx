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
        <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', color: 'var(--m3-on-surface)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    color: 'var(--m3-on-surface)',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px'
                }}>
                    {data.id}
                </h2>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '14px',
                    alignItems: 'center',
                    background: 'var(--m3-surface-variant)',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: '1px solid var(--m3-outline-variant)'
                }}>
                    <span style={{
                        background: data.status === 'active' ? '#c2efd3' : 'var(--m3-primary-container)',
                        color: data.status === 'active' ? '#064e3b' : 'var(--m3-on-primary-container)',
                        padding: '4px 12px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.5px'
                    }}>
                        {data.status}
                    </span>
                    <span style={{ color: 'var(--m3-on-surface-variant)' }}>Version: <strong style={{ color: 'var(--m3-on-surface)' }}>{data.version}</strong></span>
                    <span style={{ color: 'var(--m3-on-surface-variant)' }}>API: <strong style={{ color: 'var(--m3-on-surface)' }}>{data.apiVersion}</strong></span>
                </div>
                {data.description && data.description.purpose && (
                    <div style={{
                        marginTop: '16px',
                        fontSize: '15px',
                        color: 'var(--m3-on-surface-variant)',
                        fontStyle: 'italic',
                        lineHeight: '1.5'
                    }}>
                        "{data.description.purpose}"
                    </div>
                )}
            </div>

            {/* Schema Section */}
            <div>
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'var(--m3-primary)',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Schema Elements
                </h3>

                {schema.map((table, tIdx) => (
                    <div key={tIdx} style={{
                        marginBottom: '32px',
                        border: '1px solid var(--m3-outline-variant)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'var(--m3-surface)'
                    }}>
                        <div style={{
                            padding: '16px 20px',
                            background: 'var(--m3-surface-variant)',
                            borderBottom: '1px solid var(--m3-outline-variant)'
                        }}>
                            <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--m3-on-surface)' }}>
                                Table: <span style={{ fontFamily: 'monospace', color: 'var(--m3-primary)' }}>{table.name}</span>
                            </div>
                            {table.description && (
                                <div style={{ marginTop: '4px', fontSize: '13px', color: 'var(--m3-on-surface-variant)', lineHeight: '1.4' }}>
                                    {table.description}
                                </div>
                            )}
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                                <thead style={{ background: 'var(--m3-surface)', borderBottom: '1px solid var(--m3-outline-variant)' }}>
                                    <tr>
                                        <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Column</th>
                                        <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Logical</th>
                                        <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Physical</th>
                                        <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Examples</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.properties && table.properties.map((col, cIdx) => (
                                        <tr key={cIdx} style={{
                                            borderBottom: cIdx < table.properties.length - 1 ? '1px solid var(--m3-outline-variant)' : 'none',
                                            background: 'transparent'
                                        }}>
                                            <td style={{ padding: '14px 20px', fontWeight: '500', color: 'var(--m3-on-surface)', fontFamily: 'monospace' }}>
                                                {col.name}
                                                {col.primaryKey && (
                                                    <span style={{
                                                        marginLeft: '8px',
                                                        fontSize: '10px',
                                                        color: '#92400e',
                                                        background: '#fef3c7',
                                                        padding: '2px 6px',
                                                        borderRadius: '6px',
                                                        fontWeight: '700',
                                                        border: '1px solid #fcd34d'
                                                    }}>PK</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '14px 20px', color: 'var(--m3-on-surface)' }}>{col.logicalType}</td>
                                            <td style={{ padding: '14px 20px', color: 'var(--m3-on-surface-variant)', fontSize: '13px' }}>{col.physicalType}</td>
                                            <td style={{
                                                padding: '14px 20px',
                                                color: 'var(--m3-on-surface-variant)',
                                                fontStyle: 'italic',
                                                maxWidth: '200px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                fontSize: '13px'
                                            }}>
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
