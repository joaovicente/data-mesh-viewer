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

export default function DataUsageAgreementVisual({ data }) {
    // data is the full YAML object for the Data Usage Agreement

    const info = data.info || {};
    const provider = data.provider || {};
    const consumer = data.consumer || {};

    return (
        <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0', color: '#111827' }}>
                    Data Usage Agreement
                </h2>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                        background: info.status === 'approved' ? '#dcfce7' : '#fee2e2',
                        color: info.status === 'approved' ? '#166534' : '#991b1b',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '11px'
                    }}>
                        {info.status}
                    </span>
                    <span style={{ color: '#6b7280' }}>Start Date: <strong style={{ color: '#374151' }}>{info.startDate}</strong></span>
                </div>
                {info.purpose && (
                    <div style={{ fontSize: '14px', color: '#4b5563', fontStyle: 'italic' }}>
                        "{info.purpose}"
                    </div>
                )}
            </div>

            {/* Provider -> Consumer Flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Provider Card */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', background: '#f9fafb' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Provider
                    </h3>
                    <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                        <div>
                            <span style={{ color: '#6b7280' }}>Team: </span>
                            <span style={{ fontWeight: '500', color: '#111827' }}>{provider.teamId}</span>
                        </div>
                        <div>
                            <span style={{ color: '#6b7280' }}>Data Product: </span>
                            <span style={{ fontWeight: '500', color: '#111827', fontFamily: 'monospace' }}>{provider.dataProductId}</span>
                        </div>
                        <div>
                            <span style={{ color: '#6b7280' }}>Output Port: </span>
                            <span style={{ fontWeight: '500', color: '#2563eb', fontFamily: 'monospace' }}>{provider.outputPortId}</span>
                        </div>
                    </div>
                </div>

                {/* Arrow Indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', color: '#9ca3af' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                </div>

                {/* Consumer Card */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', background: '#f9fafb' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Consumer
                    </h3>
                    <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                        <div>
                            <span style={{ color: '#6b7280' }}>Team: </span>
                            {/* Consumer teamId might be missing in some YAMLs from registry, robust check */}
                            <span style={{ fontWeight: '500', color: '#111827' }}>{consumer.teamId || 'N/A'}</span>
                        </div>
                        <div>
                            <span style={{ color: '#6b7280' }}>Data Product: </span>
                            <span style={{ fontWeight: '500', color: '#111827', fontFamily: 'monospace' }}>{consumer.dataProductId}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
