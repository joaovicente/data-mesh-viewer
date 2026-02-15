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
        <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', color: 'var(--m3-on-surface)' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: '400',
                    margin: '0 0 16px 0',
                    color: 'var(--m3-on-surface)',
                    letterSpacing: '0px'
                }}>
                    {data.name}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '12px 24px',
                    fontSize: '14px',
                    background: 'var(--m3-surface-variant)',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid var(--m3-outline-variant)'
                }}>
                    <span style={{ color: 'var(--m3-on-surface-variant)', fontWeight: '600' }}>ID</span>
                    <span style={{ fontFamily: 'monospace', color: 'var(--m3-on-surface)' }}>{data.id}</span>

                    <span style={{ color: 'var(--m3-on-surface-variant)', fontWeight: '600' }}>Domain</span>
                    <span>{data.domain}</span>

                    <span style={{ color: 'var(--m3-on-surface-variant)', fontWeight: '600' }}>Status</span>
                    <span>
                        <span style={{
                            background: data.status === 'active' ? '#c2efd3' : 'var(--m3-primary-container)',
                            color: data.status === 'active' ? '#064e3b' : 'var(--m3-on-primary-container)',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {data.status}
                        </span>
                    </span>

                    <span style={{ color: 'var(--m3-on-surface-variant)', fontWeight: '600' }}>Version</span>
                    <span style={{ fontWeight: '500' }}>{data.apiVersion}</span>
                </div>
            </div>

            {/* Custom Properties */}
            {properties.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: 'var(--m3-primary)',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Extended Properties
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                        {properties.map((prop, idx) => (
                            <div key={idx} style={{
                                background: 'transparent',
                                padding: '16px',
                                borderRadius: '12px',
                                border: '1px solid var(--m3-outline-variant)',
                                transition: 'all 0.2s ease'
                            }}>
                                <div style={{ fontSize: '11px', color: 'var(--m3-on-surface-variant)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    {prop.property.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--m3-on-surface)' }}>
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
                    <h3 style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: 'var(--m3-primary)',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Output Ports
                    </h3>
                    <div style={{
                        border: '1px solid var(--m3-outline-variant)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'var(--m3-surface)'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                            <thead style={{ background: 'var(--m3-surface-variant)', borderBottom: '1px solid var(--m3-outline-variant)' }}>
                                <tr>
                                    <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Name</th>
                                    <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Version</th>
                                    <th style={{ padding: '12px 20px', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>Contract</th>
                                </tr>
                            </thead>
                            <tbody>
                                {outputPorts.map((port, idx) => (
                                    <tr key={idx} style={{
                                        borderBottom: idx < outputPorts.length - 1 ? '1px solid var(--m3-outline-variant)' : 'none',
                                        transition: 'background 0.2s ease'
                                    }}>
                                        <td style={{ padding: '14px 20px', color: 'var(--m3-on-surface)', fontWeight: '500' }}>{port.name}</td>
                                        <td style={{ padding: '14px 20px', color: 'var(--m3-on-surface-variant)' }}>v{port.version}</td>
                                        <td style={{ padding: '14px 20px' }}>
                                            <span style={{
                                                fontFamily: 'monospace',
                                                background: 'var(--m3-primary-container)',
                                                color: 'var(--m3-on-primary-container)',
                                                padding: '4px 10px',
                                                borderRadius: '8px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}>
                                                {port.contractId.split(':').pop()}
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
