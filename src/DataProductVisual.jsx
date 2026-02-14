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

export default function DataProductVisual({ data }) {
    // data is the full YAML object for the Data Product

    const properties = data.customProperties || [];
    const outputPorts = data.outputPorts || [];

    return (
        <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
                    {data.name}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: '13px' }}>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>ID:</span>
                    <span style={{ fontFamily: 'monospace', color: '#374151' }}>{data.id}</span>

                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Domain:</span>
                    <span>{data.domain}</span>

                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Status:</span>
                    <span>
                        <span style={{
                            background: '#dcfce7',
                            color: '#166534',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            {data.status}
                        </span>
                    </span>

                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Version:</span>
                    <span>{data.apiVersion}</span>
                </div>
            </div>

            {/* Custom Properties */}
            {properties.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Properties
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                        {properties.map((prop, idx) => (
                            <div key={idx} style={{
                                background: '#f9fafb',
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #f3f4f6'
                            }}>
                                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px', textTransform: 'capitalize' }}>
                                    {prop.property.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: '500', color: '#1f2937' }}>
                                    {prop.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Output Ports */}
            {outputPorts.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Output Ports
                    </h3>
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                            <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <tr>
                                    <th style={{ padding: '10px 16px', fontWeight: '600', color: '#4b5563' }}>Name</th>
                                    <th style={{ padding: '10px 16px', fontWeight: '600', color: '#4b5563' }}>Version</th>
                                    <th style={{ padding: '10px 16px', fontWeight: '600', color: '#4b5563' }}>Contract ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {outputPorts.map((port, idx) => (
                                    <tr key={idx} style={{ borderBottom: idx < outputPorts.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                                        <td style={{ padding: '10px 16px', color: '#1f2937', fontWeight: '500' }}>{port.name}</td>
                                        <td style={{ padding: '10px 16px', color: '#6b7280' }}>v{port.version}</td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{
                                                fontFamily: 'monospace',
                                                background: '#eff6ff',
                                                color: '#1d4ed8',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                            }}>
                                                {port.contractId}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
