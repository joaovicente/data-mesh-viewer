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

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
    return (
        <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: data.backgroundColor || 'white',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            width: '280px',
            height: '110px',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                background: data.bannerColor || '#BFDBFE',
                padding: '8px 12px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    color: '#1e3a8a',
                    textTransform: 'uppercase'
                }}>
                    {data.banner}
                </span>

                <div
                    className="nodrag yaml-pill"
                    style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        borderRadius: '4px',
                        padding: '4px', // Adjusted padding for icon
                        cursor: 'pointer',
                        color: '#1e3a8a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        marginLeft: '8px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Use originalData if available, otherwise fallback to data (though flow now passes originalData)
                        const content = data.originalData || data;
                        const event = new CustomEvent('open-side-panel', {
                            detail: {
                                id: data.id,
                                type: 'data-product-yaml',
                                content: content
                            }
                        });
                        window.dispatchEvent(event);
                    }}
                    title="View Source YAML"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
            </div>
            <div style={{ padding: '12px', display: 'flex', alignItems: 'flex-start' }}>
                <Handle
                    type="target"
                    position={Position.Left}
                    onConnect={(params) => console.log('Data Product connected:', params)}
                    isConnectable={isConnectable}
                    style={{ top: '50%', background: '#9ca3af' }}
                />

                <img
                    src={data.icon}
                    alt="icon"
                    style={{ width: '32px', height: '32px', marginRight: '12px', marginTop: '2px' }}
                />

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', lineHeight: '1.2' }}>
                            {data.label}
                        </div>
                        {data.hasOutputPorts && (
                            <div
                                className="nodrag output-ports-pill"
                                data-node-id={data.id}
                                style={{
                                    background: '#dcfce7',
                                    color: '#166534',
                                    padding: '2px 6px',
                                    borderRadius: '10px',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    border: '1px solid #bbf7d0',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Output Ports ({data.outputPortCount || 0})
                            </div>
                        )}
                    </div>
                    {data.subtitle && (
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                            {data.subtitle}
                        </div>
                    )}
                </div>

                <Handle
                    type="source"
                    position={Position.Right}
                    isConnectable={isConnectable}
                    style={{ top: '50%', background: '#9ca3af' }}
                />
            </div>


        </div>
    );
});
